package com.backend.backend.domain.repositories;

import com.backend.backend.domain.entities.OutputFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OutputFileRepository extends JpaRepository<OutputFile, Long> {
}
