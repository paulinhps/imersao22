package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/paulinhps/imersao22/go-gateway/internal/repository"
	"github.com/paulinhps/imersao22/go-gateway/internal/service"
	"github.com/paulinhps/imersao22/go-gateway/internal/web/server"
)

func GetEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	connString := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		GetEnv("DB_HOST", "db"),
		GetEnv("DB_PORT", "5432"),
		GetEnv("DB_USER", "postgres"),
		GetEnv("DB_PASSWORD", "postgres"),
		GetEnv("DB_NAME", "gateway"),
		GetEnv("DB_SSLMODE", "disable"),
	)

	db, err := sql.Open("postgres", connString)
	if err != nil {
		log.Fatal("Error connecting to database")
	}
	defer db.Close()

	accountRepository := repository.NewAccountRepository(db)
	accountService := service.NewAccountService(accountRepository)

	server := server.NewServer(accountService, GetEnv("HTTP_PORT", "8080"))
	server.ConfigureRoutes()

	if err := server.Start(); err != nil {
		log.Fatal("Error starting server")
	}
}
