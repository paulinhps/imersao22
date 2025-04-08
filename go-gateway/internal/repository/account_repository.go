package repository

import (
	"database/sql"
	"sync"
	"time"

	"github.com/paulinhps/imersao22/go-gateway/internal/domain"
)

type AccountRepository struct {
	db    *sql.DB
	mutex sync.Mutex
}

func NewAccountRepository(db *sql.DB) *AccountRepository {
	return &AccountRepository{db: db}
}

func (r *AccountRepository) Save(account *domain.Account) error {
	stmt, err := r.db.Prepare("INSERT INTO accounts (id, name, email, api_key, balance, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(account.ID, account.Name, account.Email, account.APIKey, account.Balance, account.CreatedAt, account.UpdatedAt)

	if err != nil {
		return err
	}

	return nil
}

func (r *AccountRepository) FindByAPIKey(apiKey string) (*domain.Account, error) {
	stmt, err := r.db.Prepare("SELECT id, name, email, api_key, balance, created_at, updated_at FROM accounts WHERE api_key = $1")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var account domain.Account
	err = stmt.QueryRow(apiKey).Scan(
		&account.ID,
		&account.Name,
		&account.Email,
		&account.APIKey,
		&account.Balance,
		&account.CreatedAt,
		&account.UpdatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, domain.ErrAccountNotFound
	}

	return &account, nil
}

func (r *AccountRepository) FindByID(id string) (*domain.Account, error) {
	stmt, err := r.db.Prepare("SELECT id, name, email, api_key, balance, created_at, updated_at FROM accounts WHERE id = $1")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var account domain.Account
	err = stmt.QueryRow(id).Scan(
		&account.ID,
		&account.Name,
		&account.Email,
		&account.APIKey,
		&account.Balance,
		&account.CreatedAt,
		&account.UpdatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, domain.ErrAccountNotFound
	}

	return &account, nil
}

func (r *AccountRepository) Update(account *domain.Account) error {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	tx, err := r.db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	stmt, err := tx.Prepare("UPDATE accounts SET balance = $1, updated_at = $2 WHERE id = $3")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(
		account.Balance,
		time.Now(),
		account.ID,
	)

	if err != nil {
		return err
	}

	return tx.Commit()
}
