package com.backend.infrastructure.postgres.repositories;

import com.backend.infrastructure.postgres.entities.InputFile;
import com.backend.infrastructure.postgres.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InputFileRepository extends JpaRepository<InputFile, Long> {

    List<InputFile> findByUser(User user);
}
