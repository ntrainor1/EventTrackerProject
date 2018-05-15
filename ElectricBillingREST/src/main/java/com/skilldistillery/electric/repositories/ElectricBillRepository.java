package com.skilldistillery.electric.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.entities.ElectricBill;

public interface ElectricBillRepository extends JpaRepository<ElectricBill, Integer> {
	
	public List<ElectricBill> findByManagerLastName(String lastName);
	
	public List<ElectricBill> findByYearBetween(int lowest, int highest);
	
	public List<ElectricBill> findByCostBetween(double lowest, double highest);
	
	public List<ElectricBill> findByWattageBetween(int lowest, int highest);
	
}
