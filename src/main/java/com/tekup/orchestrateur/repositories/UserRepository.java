package com.tekup.orchestrateur.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tekup.orchestrateur.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

}
