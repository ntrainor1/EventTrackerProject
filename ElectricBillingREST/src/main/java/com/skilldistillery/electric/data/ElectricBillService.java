package com.skilldistillery.electric.data;

import java.util.List;

import com.skilldistillery.entities.ElectricBill;

public interface ElectricBillService {

	List<ElectricBill> index();

	ElectricBill create(ElectricBill jsonBill);

	ElectricBill show(int id);

	ElectricBill replace(ElectricBill jsonBill, int id);

	ElectricBill update(ElectricBill jsonBill, int id);

	Boolean delete(int id);

	List<ElectricBill> findByManager(String lastName);
	
	List<ElectricBill> findByYearRange(int lowest, int highest);
	
	List<ElectricBill> findByCostRange(double lowest, double highest);
	
	List<ElectricBill> findByWattageRange(int lowest, int highest);
}
