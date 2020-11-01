package database

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

// CheckPassword check if username and password match
func CheckPassword(username, password string) bool {
	// get password
	pw, err := getPassword(username)

	if err != nil {
		return false
	}

	crypto := sha256.New()
	crypto.Write([]byte(password))
	cryptoPassword := hex.EncodeToString(crypto.Sum(nil))
	if *pw == cryptoPassword {
		return true
	}

	return false
}

// getPassword get password from mongodb
func getPassword(username string) (*string, error) {
	var result struct {
		Username string
		Password string
	}

	collection := c.Database("personal-website").Collection("user")
	filter := bson.M{"Username": username}
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := collection.FindOne(ctx, filter).Decode(&result)
	if err != nil {
		return nil, err
	}

	return &result.Password, nil
}
