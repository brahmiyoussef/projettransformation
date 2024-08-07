package com.backend.infrastructure.postgres.repositories;

import com.backend.infrastructure.postgres.entities.InputFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InputFileRepository extends JpaRepository<InputFile, Long> {
}
