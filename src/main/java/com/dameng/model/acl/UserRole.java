package com.dameng.model.acl;

import com.dameng.model.BaseEntity;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Column;
import javax.persistence.Entity;

/**
 * Created by mdc on 2017/5/10.
 */
@Entity
public class UserRole extends BaseEntity implements GrantedAuthority {
    public static final String ROLE_NO_BODY = "ROLE_NO_BODY";

    public UserRole() {
    }

    public UserRole(String roleName) {
        this.role = roleName;
    }

    /***
     * role名称
     */
    @Column(unique = true, nullable = false)
    public String role;

    public long authorityMask;

    public int hashCode() {
        return this.role.hashCode();
    }

    public String toString() {
        return this.role;
    }

    @Override
    public String getAuthority() {
        return role;
    }
}
