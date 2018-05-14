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

	@RequestMapping(path = "electricbills", method = RequestMethod.GET)
	public List<ElectricBill> index() {
		return ebSI.index();
	}

	@RequestMapping(path = "electricbills/{id}", method = RequestMethod.GET)
	public ElectricBill show(@PathVariable int id) {
		return ebSI.show(id);
	}

	@RequestMapping(path = "electricbills", method = RequestMethod.POST)
	public ElectricBill create(@RequestBody ElectricBill jsonBill) {
		return ebSI.create(jsonBill);
	}
	
	@RequestMapping(path = "electricbills/{id}", method = RequestMethod.PUT)
	public ElectricBill replace(@RequestBody ElectricBill jsonBill, @PathVariable int id) {
		return ebSI.replace(jsonBill, id);
	}
	
	@RequestMapping(path = "electricbills/{id}", method = RequestMethod.PATCH)
	public ElectricBill update(@RequestBody ElectricBill jsonBill, @PathVariable int id) {
		return ebSI.update(jsonBill, id);
	}
	
	@RequestMapping(path = "electricbills/{id}", method = RequestMethod.DELETE)
	public Boolean delete(@PathVariable int id) {
		return ebSI.delete(id);
	}
}
