package com.dameng.model.acl;

import com.dameng.model.BaseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by mdc on 2017/5/8.
 */
@Entity
@Table(name="CUST_USER")
public class CustUser extends BaseEntity implements UserDetails{

    /**用户名*/
    @Column(nullable = false)
    public String username;

    /**密码*/
    @Column(nullable = false)
    public String password;

    /**真实姓名*/
    public String realName;

    /**邮箱*/
    public String email;

    /**联系电话*/
    public String phone;

    /**是否允许登录*/
    public boolean enable;

    /**用户角色*/
    @OneToOne
    public UserRole role ;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<UserRole> roles = new HashSet<>();
        roles.add(role);
        return roles;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enable;
    }
}
