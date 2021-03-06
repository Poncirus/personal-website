package database

import (
	"context"
	"errors"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// ArticleID is primitive.ObjectID
type ArticleID *primitive.ObjectID

// Article contains article infomation
type Article struct {
	ID               ArticleID  `bson:"_id,omitempty"`
	Title            string     `bson:",omitempty"`
	Description      string     `bson:",omitempty"`
	CreateTime       *time.Time `bson:",omitempty"`
	LastModification *time.Time `bson:",omitempty"`
	Tags             []string   `bson:",omitempty"`
	Markdown         string     `bson:",omitempty"`
}

// NewArticleID form ArticleID from Hex string
func NewArticleID(HexID string) (ArticleID, error) {
	id, err := primitive.ObjectIDFromHex(HexID)
	return &id, err
}

// SaveArticle insert or update article, return hex string of _id
func SaveArticle(article Article) (string, error) {
	collection := c.Database("personal-website").Collection("article")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var id primitive.ObjectID

	if article.ID == nil {
		res, err := collection.InsertOne(ctx, article)

		if err != nil {
			return "", err
		}

		id = res.InsertedID.(primitive.ObjectID)
	} else {
		res, err := collection.UpdateOne(ctx, bson.M{"_id": article.ID}, bson.M{"$set": article})

		if err != nil {
			return "", err
		}

		if res.ModifiedCount != 1 {
			return "", errors.New("Can not find article")
		}

		id = *article.ID
	}

	return id.Hex(), nil
}

// FindAritcle find articles meeting requirements
func FindAritcle(title string, tags []string, count int, offset int, sort string, order int) ([]Article, error) {
	collection := c.Database("personal-website").Collection("article")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	opts := options.Find().SetSkip(int64(offset)).SetLimit(int64(count)).SetSort(bson.M{sort: order})
	filter := bson.M{"title": primitive.Regex{Pattern: ".*" + title + ".*", Options: "i"}}
	if tags != nil && len(tags) != 0 && tags[0] != "" {
		filter["tags"] = bson.M{"$all": tags}
	}
	cursor, err := collection.Find(ctx, filter, opts)

	if err != nil {
		return nil, err
	}

	var results []Article
	if err = cursor.All(context.TODO(), &results); err != nil {
		log.Fatal(err)
		return nil, err
	}

	if results == nil {
		results = []Article{}
	}

	return results, nil
}

// FindOneArticle find article with id
func FindOneArticle(hexID string) (*Article, error) {
	collection := c.Database("personal-website").Collection("article")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var article Article
	id, err := primitive.ObjectIDFromHex(hexID)
	if err != nil {
		return nil, err
	}

	err = collection.FindOne(ctx, bson.M{"_id": id}).Decode(&article)
	if err != nil {
		return nil, err
	}

	return &article, nil
}

// DeleteArticle delete article with id
func DeleteArticle(hexID string) error {
	collection := c.Database("personal-website").Collection("article")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	id, err := primitive.ObjectIDFromHex(hexID)
	if err != nil {
		return err
	}

	result, err := collection.DeleteOne(ctx, bson.M{"_id": id})
	if err != nil {
		return nil
	}

	if result.DeletedCount != 1 {
		return errors.New("Cannot find article")
	}

	return nil
}

// FindTags get all tags
func FindTags() ([]string, error) {
	collection := c.Database("personal-website").Collection("article")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	project := bson.M{"$project": bson.M{"tags": true}}
	unwind := bson.M{"$unwind": "$tags"}
	group1 := bson.M{"$group": bson.M{"_id": "$tags"}}
	group2 := bson.M{"$group": bson.M{"_id": "null", "array": bson.M{"$push": "$_id"}}}
	cursor, err := collection.Aggregate(ctx, bson.A{project, unwind, group1, group2})

	if err != nil {
		return nil, err
	}

	type tag struct {
		Array []string `bson:"array"`
	}
	var tags []tag

	if err = cursor.All(context.TODO(), &tags); err != nil {
		log.Fatal(err)
		return nil, err
	}

	return tags[0].Array, nil
}
