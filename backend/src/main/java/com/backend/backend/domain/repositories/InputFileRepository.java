package com.backend.backend.domain.repositories;

import com.backend.backend.domain.entities.InputFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InputFileRepository extends JpaRepository<InputFile, Long> {
}
