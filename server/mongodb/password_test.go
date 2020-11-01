package database

import "testing"

func TestCheckPassword(t *testing.T) {
	Init("mongodb://localhost:27017")
	type args struct {
		username string
		password string
	}
	tests := []struct {
		name string
		args args
		want bool
	}{
		{name: "wrong password",
			args: args{username: "LiaoHanwen", password: "f7a42e77c151c994be4b214c9ed3fa01b8b93ae040b37952e7e16e2d61e75913"},
			want: false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := CheckPassword(tt.args.username, tt.args.password); got != tt.want {
				t.Errorf("CheckPassword() = %v, want %v", got, tt.want)
			}
		})
	}
}
