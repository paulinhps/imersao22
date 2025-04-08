package domain

import "errors"

var (
	ErrAccountNotFound      = errors.New("account not found")
	ErrDuplicatedAPIKey     = errors.New("duplicated api key")
	ErrorInvoiceNotFound    = errors.New("invoice not found")
	ErrorUnauthorizedAccess = errors.New("unauthorized access")
)
