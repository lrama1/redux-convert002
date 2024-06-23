package com.sample.web.domain;

import jakarta.validation.constraints.NotBlank;
import java.util.Set;
import java.util.Date;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity(name = "account")
public class Account {
	@Id
	private String accountId;
	private String accountName;
	private String accountBalance;

	public String getAccountId() {
		return accountId;
	}

	public String getAccountName() {
		return accountName;
	}

	public String getAccountBalance() {
		return accountBalance;
	}

	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public void setAccountBalance(String accountBalance) {
		this.accountBalance = accountBalance;
	}

	public String toString() {
		return "accountId = " + accountId + ", accountName = " + accountName + ", accountBalance = " + accountBalance;
	}
}
