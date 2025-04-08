package service

import (
	"github.com/paulinhps/imersao22/go-gateway/internal/domain"
	"github.com/paulinhps/imersao22/go-gateway/internal/dto"
)

type AccountService struct {
	accountRepository domain.AccountRepository
}

func NewAccountService(accountRepository domain.AccountRepository) *AccountService {
	return &AccountService{accountRepository: accountRepository}
}

func (s *AccountService) CreateAccount(input *dto.CreateAccountInput) (*dto.AccountOutput, error) {
	account := dto.ToAccount(input)

	existingAccount, err := s.accountRepository.FindByAPIKey(account.APIKey)
	if err != nil && err != domain.ErrAccountNotFound {
		return nil, err
	}

	if existingAccount != nil {
		return nil, domain.ErrDuplicatedAPIKey
	}

	err = s.accountRepository.Save(account)
	if err != nil {
		return nil, err
	}

	output := dto.FromAccountOutput(account)

	return output, nil
}

func (s *AccountService) UpdateBalance(apiKey string, amount float64) (*dto.AccountOutput, error) {
	account, err := s.accountRepository.FindByAPIKey(apiKey)
	if err != nil {
		return nil, err
	}

	account.UpdateBalance(amount)

	err = s.accountRepository.Update(account)
	if err != nil {
		return nil, err
	}

	output := dto.FromAccountOutput(account)

	return output, nil
}

func (s *AccountService) FindByAPIKey(apiKey string) (*dto.AccountOutput, error) {
	account, err := s.accountRepository.FindByAPIKey(apiKey)
	if err != nil {
		return nil, err
	}

	output := dto.FromAccountOutput(account)

	return output, nil
}

func (s *AccountService) FindByID(id string) (*dto.AccountOutput, error) {
	account, err := s.accountRepository.FindByID(id)
	if err != nil {
		return nil, err
	}

	output := dto.FromAccountOutput(account)

	return output, nil
}
