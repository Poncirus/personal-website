package database

import (
	"fmt"
	"testing"
	"time"
)

func TestSaveArticle(t *testing.T) {
	Init()

	now := time.Now()

	type args struct {
		article Article
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		{
			name: "insert",
			args: args{
				Article{
					ID:               nil,
					Title:            "Test title3",
					Description:      "Test description",
					CreateTime:       &now,
					LastModification: &now,
					Tags:             []string{"test", "test tag2"},
				},
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := SaveArticle(tt.args.article)
			t.Logf("id: %s", got)
			if (err != nil) != tt.wantErr {
				t.Errorf("SaveArticle() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
		})
	}
}

func TestFindAllArticle(t *testing.T) {
	Init()
	got, err := FindAllArticle()
	if err != nil {
		t.Errorf("error = %v", err)
		return
	}

	fmt.Println(got)
}
