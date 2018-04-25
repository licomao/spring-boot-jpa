package com.dameng.repository;

import com.dameng.model.acl.CustUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by mdc on 2017/5/10.
 */
@Repository
public interface CustUserRepository extends JpaRepository<CustUser, Long> {
    CustUser findByUsernameAndDeleted(String userName, boolean deleted);
}
