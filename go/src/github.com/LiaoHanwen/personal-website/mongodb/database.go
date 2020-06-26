package database

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// c mongodb client
var c *mongo.Client

// Init a mongodb client
func Init(server string) error {
	ctx, cancle := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancle()

	var err error
	c, err = mongo.Connect(ctx, options.Client().ApplyURI())

	if err != nil {
		fmt.Println("database connect fail")
		return err
	}
	return nil
}
