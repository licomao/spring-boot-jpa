package com.dameng.common.security;

import com.dameng.model.acl.CustUser;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Configuration
@EnableJpaAuditing
class DataAuditorConfig {

    @Bean
    public AuditorAware<String> auditorProvider() {
        return new DataAuditorAware();
    }

    static class DataAuditorAware implements AuditorAware<String> {

        private final static Log log = LogFactory.getLog(DataAuditorAware.class);

        public String getCurrentAuditor() {

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null || !authentication.isAuthenticated()) {
                return null;
            }

            if (authentication.getPrincipal() instanceof String) {
                log.debug("Detected anonymous auditor as" + authentication.getPrincipal());
                return (String) authentication.getPrincipal();

            } else if (authentication.getPrincipal() instanceof CustUser) {
                CustUser user = (CustUser) authentication.getPrincipal();
                String auditorName = user.id + "-" + user.getUsername();
                log.debug("Detected authorised ERPUser as" + auditorName);
                return auditorName;

            } else {
                throw new RuntimeException("Security Configuration is not setup correctly.");
            }
        }
    }
}
