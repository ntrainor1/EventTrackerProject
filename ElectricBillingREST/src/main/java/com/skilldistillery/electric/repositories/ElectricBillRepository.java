package com.skilldistillery.electric.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.entities.ElectricBill;

public interface ElectricBillRepository extends JpaRepository<ElectricBill, Integer> {
	
}
