package com.dameng.common.security;

import com.dameng.model.acl.CustUser;
import com.dameng.repository.CustUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("userDetailsService")
@Qualifier("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private CustUserRepository userRepository;

    @Autowired(required = false)
    public ResourceBundleMessageSource messageSource;

    @Override
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
        CustUser user = userRepository.findByUsernameAndDeleted(username, false);
        if (user == null) {
            throw new UsernameNotFoundException(messageSource == null ? String.format("Login as %s failed", username)
                    : messageSource.getMessage("login.error", new String[]{username}, LocaleContextHolder.getLocale()));
        }
        return user;
    }
}
