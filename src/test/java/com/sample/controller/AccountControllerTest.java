package com.sample.controller;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.security.Principal;
import java.util.Collection;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.security.Principal;
import java.util.Collection;

//import the domain
import com.sample.web.domain.Account;

import com.sample.service.AccountService;

@ExtendWith(MockitoExtension.class)
public class AccountControllerTest {

	@Mock
	AccountService mockAccountService;

	@InjectMocks
	AccountController classToTest;

	@Test
	public void testUpdate() {
		Account account = new Account();
		account.setAccountId("1111");
		when(mockAccountService.getAccount("1111")).thenReturn(account);
		Account accountToReturn = classToTest.getAccount("1111", getMockPrincipal());

		assertEquals("1111", accountToReturn.getAccountId());
	}

	private Principal getMockPrincipal() {
		Principal principal = new Authentication() {

			@Override
			public String getName() {
				return "axlrama";
			}

			@Override
			public void setAuthenticated(boolean arg0) throws IllegalArgumentException {
				// TODO Auto-generated method stub

			}

			@Override
			public boolean isAuthenticated() {
				// TODO Auto-generated method stub
				return false;
			}

			@Override
			public Object getPrincipal() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public Object getDetails() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public Object getCredentials() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public Collection<? extends GrantedAuthority> getAuthorities() {
				// TODO Auto-generated method stub
				return null;
			}
		};
		return principal;
	}
}
