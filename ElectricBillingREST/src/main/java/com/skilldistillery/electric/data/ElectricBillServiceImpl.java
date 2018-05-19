package com.skilldistillery.electric.data;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.electric.repositories.ElectricBillRepository;
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

		ebRepo.flush();
		
		return ebRepo.findById(id).get();
	}

	@Override
	public ElectricBill update(ElectricBill jsonBill, int id) {
		ElectricBill managedBill = ebRepo.findById(id).get();
		
		if(jsonBill.getCost() != 0) {
			managedBill.setCost(jsonBill.getCost());
		}
		if(jsonBill.getYear() != 0) {
			managedBill.setYear(jsonBill.getYear());
		}
		if(jsonBill.getWattage() != 0) {
			managedBill.setWattage(jsonBill.getWattage());
		}
		if(jsonBill.getManagerFirstName() != null && !jsonBill.getManagerFirstName().equals("")) {
			managedBill.setManagerFirstName(jsonBill.getManagerFirstName());
		}
		if(jsonBill.getManagerLastName() != null && !jsonBill.getManagerLastName().equals("")) {
			managedBill.setManagerLastName(jsonBill.getManagerLastName());
		}

		ebRepo.flush();
		
		return ebRepo.findById(id).get();
	}

	@Override
	public Boolean delete(int id) {
		ebRepo.deleteById(id);
		if (ebRepo.findById(id).isPresent()) {
			return false;
		}
		return true;
	}

	@Override
	public List<ElectricBill> findByManager(String lastName) {
		return ebRepo.findByManagerLastName(lastName);
	}

	@Override
	public List<ElectricBill> findByYearRange(int lowest, int highest) {
		return ebRepo.findByYearBetween(lowest, highest);
	}

	@Override
	public List<ElectricBill> findByCostRange(double lowest, double highest) {
		return ebRepo.findByCostBetween(lowest, highest);
	}

	@Override
	public List<ElectricBill> findByWattageRange(int lowest, int highest) {
		return ebRepo.findByWattageBetween(lowest, highest);
	}

}
