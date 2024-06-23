package com.sample.controller;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
public class MiscController {
	@GetMapping(value = "/csrf.js", produces = "application/javascript")
	public String getCsrfToken() {
		String csrfToken = "";
		try {
			HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
					.getRequest();
			CsrfToken token = new HttpSessionCsrfTokenRepository().loadToken(request);

			if (null != token && null != token.getToken()) {
				csrfToken = token.getToken();
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return "document.getElementById('__csrftoken').setAttribute('content', '" + csrfToken + "');\r\n"
				+ "document.getElementById('__csrfheader').setAttribute('content', 'x-csrf-token');";
	}
}
