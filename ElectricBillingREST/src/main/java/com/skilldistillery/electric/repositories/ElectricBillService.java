package com.skilldistillery.electric.repositories;

import java.util.List;

import com.skilldistillery.entities.ElectricBill;

public interface ElectricBillService {

	List<ElectricBill> index();

	ElectricBill create(ElectricBill jsonBill);

	ElectricBill show(int id);

	ElectricBill replace(ElectricBill jsonBill, int id);

	ElectricBill update(ElectricBill jsonBill, int id);

	Boolean delete(int id);

}
