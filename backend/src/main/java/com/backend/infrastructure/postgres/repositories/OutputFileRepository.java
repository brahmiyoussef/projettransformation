package com.backend.infrastructure.postgres.repositories;

import com.backend.infrastructure.postgres.entities.OutputFile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OutputFileRepository extends JpaRepository<OutputFile, Long> {
}
