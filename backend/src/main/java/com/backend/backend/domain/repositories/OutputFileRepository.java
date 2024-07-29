package com.backend.backend.domain.repositories;

import com.backend.backend.domain.entities.OutputFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OutputFileRepository extends JpaRepository<OutputFile, Long> {
}
