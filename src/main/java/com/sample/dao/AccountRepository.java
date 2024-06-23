package com.sample.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sample.web.domain.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
}
