package com.skilldistillery.electric.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.entities.ElectricBill;

@Service
public class ElectricBillServiceImpl implements ElectricBillService {

	@Autowired
	private ElectricBillRepository ebRepo;

	@Override
	public List<ElectricBill> index() {
		return ebRepo.findAll();
	}

	@Override
	public ElectricBill create(ElectricBill jsonBill) {
		return ebRepo.saveAndFlush(jsonBill);
	}

	@Override
	public ElectricBill show(int id) {
		return ebRepo.findById(id).get();
	}

	@Override
	public ElectricBill replace(ElectricBill jsonBill, int id) {
		ElectricBill managedBill = ebRepo.findById(id).get();

		managedBill.setCost(jsonBill.getCost());
		managedBill.setYear(jsonBill.getYear());
		managedBill.setWattage(jsonBill.getWattage());
		managedBill.setManagerFirstName(jsonBill.getManagerFirstName());
		managedBill.setManagerLastName(jsonBill.getManagerLastName());

		return managedBill;
	}

	@Override
	public ElectricBill update(ElectricBill newBill, int id) {
		ElectricBill managedBill = ebRepo.findById(id).get();
		
		if(newBill.getCost() != 0) {
			managedBill.setCost(newBill.getCost());
		}
		if(newBill.getYear() != 0) {
			managedBill.setYear(newBill.getYear());
		}
		if(newBill.getWattage() != 0) {
			managedBill.setWattage(newBill.getWattage());
		}
		if(newBill.getManagerFirstName() != null && !newBill.getManagerFirstName().equals("")) {
			managedBill.setManagerFirstName(newBill.getManagerFirstName());
		}
		if(newBill.getManagerLastName() != null && !newBill.getManagerLastName().equals("")) {
			managedBill.setManagerLastName(newBill.getManagerLastName());
		}
		
		return null;
	}

	@Override
	public Boolean delete(int id) {
		ebRepo.deleteById(id);
		if (ebRepo.findById(id).isPresent()) {
			return false;
		}
		return true;
	}

}
