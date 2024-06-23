package com.sample.service;

import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

//import the domain
import com.sample.web.domain.Account;
import com.sample.common.ListWrapper;
import com.sample.dao.AccountRepository;
import com.sample.common.SortedIndicator;

@Service
public class AccountService {

	@Autowired
	AccountRepository accountRepository;

	public ListWrapper<Account> getAccounts(int pageNumber, int pageSize, String sortByAttribute,
			String sortDirection) {
		//return accountDAO.getAccounts(pageNumber, pageSize, sortByAttribute, sortDirection);

		PageRequest request = PageRequest.of(pageNumber - 1, pageSize);
		if (!"".equals(sortByAttribute)) {
			Sort sortSetting = Sort.by("1".equals(sortDirection) ? Direction.ASC : Direction.DESC, sortByAttribute);
			request = PageRequest.of(pageNumber - 1, pageSize, sortSetting);
		}
		Page<Account> accountPage = accountRepository.findAll(request);
		ListWrapper<Account> results = new ListWrapper<>();
		results.setRows(accountPage.getContent());
		results.setTotalRecords(new Long(accountPage.getTotalElements()).intValue());
		results.setCurrentPage(pageNumber - 1);
		results.setSortedIndicator(new SortedIndicator(sortByAttribute, sortDirection));
		return results;

	}

	public Account getAccount(String id) {
		return accountRepository.findById(id).get();
	}

	public void saveNewAccount(Account account) {
		account.setAccountId(UUID.randomUUID().toString());
		accountRepository.saveAndFlush(account);
	}

	public void saveAccount(Account account) {
		accountRepository.saveAndFlush(account);
	}
}
