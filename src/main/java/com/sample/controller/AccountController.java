package com.sample.controller;

import org.springframework.beans.factory.annotation.Autowired;
import java.security.Principal;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;

//import the domain
import com.sample.web.domain.Account;
import com.sample.service.AccountService;
import com.sample.common.ListWrapper;
import com.sample.common.NameValuePair;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.context.MessageSource;

import java.util.List;
import java.util.ArrayList;

@RestController
public class AccountController extends BaseController {

	@Autowired
	AccountService accountService;

	@Resource(name = "messageSource")
	private MessageSource messageSource;

	//@PreAuthorize("@sampleUserDetailsService.isAuthorizedToAccessData(#id)")	
	@RequestMapping(value = "/account/{id}", method = RequestMethod.GET)
	public Account getAccount(@PathVariable("id") String id, Principal principal) {
		Authentication authenticationToken = (Authentication) principal;
		Account account = accountService.getAccount(id);
		if (account == null)
			return new Account();
		else
			return account;
	}

	@RequestMapping(value = "/account", headers = { "accept=application/json" }, method = RequestMethod.POST)
	public Account saveNewAccount(@Valid @RequestBody Account account) {
		accountService.saveNewAccount(account);
		return account;
	}

	@RequestMapping(value = "/account/{id}", headers = { "accept=application/json" }, method = RequestMethod.PUT)
	public Account updateAccount(@Valid @RequestBody Account account) {
		accountService.saveAccount(account);
		return account;
	}

	@RequestMapping("/accounts")
	public ListWrapper<Account> getAllAccounts(@RequestParam("page") int pageNumber,
			@RequestParam("per_page") int pageSize,
			@RequestParam(value = "sort_by", required = false) String sortByAttributeName,
			@RequestParam(value = "order", required = false) String sortDirection) {
		return accountService.getAccounts(pageNumber, pageSize, sortByAttributeName, sortDirection);

	}

	//=============
}
