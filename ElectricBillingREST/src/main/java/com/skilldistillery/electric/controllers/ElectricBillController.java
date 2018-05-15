package com.skilldistillery.electric.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.electric.repositories.ElectricBillService;
import com.skilldistillery.entities.ElectricBill;

@RestController
@RequestMapping("api")
public class ElectricBillController {

	@Autowired
	private ElectricBillService ebSI;

	// DONE
	@RequestMapping(path = "electricbills", method = RequestMethod.GET)
	public List<ElectricBill> index() {
		return ebSI.index();
	}

	// DONE
	@RequestMapping(path = "electricbills/{id}", method = RequestMethod.GET)
	public ElectricBill show(@PathVariable int id) {
		return ebSI.show(id);
	}

	// DONE
	@RequestMapping(path = "electricbills", method = RequestMethod.POST)
	public ElectricBill create(@RequestBody ElectricBill jsonBill) {
		return ebSI.create(jsonBill);
	}
	
	// DONE
	@RequestMapping(path = "electricbills/{id}", method = RequestMethod.PUT)
	public ElectricBill replace(@RequestBody ElectricBill jsonBill, @PathVariable int id) {
		return ebSI.replace(jsonBill, id);
	}
	
	// DONE
	@RequestMapping(path = "electricbills/{id}", method = RequestMethod.PATCH)
	public ElectricBill update(@RequestBody ElectricBill jsonBill, @PathVariable int id) {
		System.out.println(jsonBill);
		return ebSI.update(jsonBill, id);
	}
	
	// DONE
	@RequestMapping(path = "electricbills/{id}", method = RequestMethod.DELETE)
	public Boolean delete(@PathVariable int id) {
		return ebSI.delete(id);
	}
	
	// DONE
	@RequestMapping(path = "electricbills/search/manager/{lastName}", method = RequestMethod.GET)
	public List<ElectricBill> findByLastName(@PathVariable String lastName) {
		return ebSI.findByManager(lastName);
	}
	
	// DONE
	@RequestMapping(path = "electricbills/search/price/{low}/{high}", method = RequestMethod.GET)
	public List<ElectricBill>findByCost(@PathVariable double low, @PathVariable double high) {
		return ebSI.findByCostRange(low, high);
	}
	
	// DONE
	@RequestMapping(path = "electricbills/search/wattage/{low}/{high}", method = RequestMethod.GET)
	public List<ElectricBill> findByWattage(@PathVariable int low, @PathVariable int high) {
		return ebSI.findByWattageRange(low, high);
	}
	
	// DONE
	@RequestMapping(path = "electricbills/search/year/{low}/{high}", method = RequestMethod.GET)
	public List<ElectricBill> findByYearRange(@PathVariable int low, @PathVariable int high) {
		return ebSI.findByYearRange(low, high);
	}
}
