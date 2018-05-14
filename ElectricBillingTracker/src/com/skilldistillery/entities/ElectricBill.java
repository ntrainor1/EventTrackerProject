package com.skilldistillery.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "electric_bill")
public class ElectricBill {

	// FIELDS
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private double cost;
	
	private int year;
	
	private int wattage;
	
	@Column(name = "manager_first_name")
	private String managerFirstName;
	
	@Column(name = "manager_last_name")
	private String managerLastName;

	// GETTERS AND SETTERS
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getCost() {
		return cost;
	}

	public void setCost(double cost) {
		this.cost = cost;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getWattage() {
		return wattage;
	}

	public void setWattage(int wattage) {
		this.wattage = wattage;
	}

	public String getManagerFirstName() {
		return managerFirstName;
	}

	public void setManagerFirstName(String managerFirstName) {
		this.managerFirstName = managerFirstName;
	}

	public String getManagerLastName() {
		return managerLastName;
	}

	public void setManagerLastName(String managerLastName) {
		this.managerLastName = managerLastName;
	}

	// HASH CODE AND EQUALS
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(cost);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + id;
		result = prime * result + ((managerFirstName == null) ? 0 : managerFirstName.hashCode());
		result = prime * result + ((managerLastName == null) ? 0 : managerLastName.hashCode());
		result = prime * result + wattage;
		result = prime * result + year;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ElectricBill other = (ElectricBill) obj;
		if (Double.doubleToLongBits(cost) != Double.doubleToLongBits(other.cost))
			return false;
		if (id != other.id)
			return false;
		if (managerFirstName == null) {
			if (other.managerFirstName != null)
				return false;
		} else if (!managerFirstName.equals(other.managerFirstName))
			return false;
		if (managerLastName == null) {
			if (other.managerLastName != null)
				return false;
		} else if (!managerLastName.equals(other.managerLastName))
			return false;
		if (wattage != other.wattage)
			return false;
		if (year != other.year)
			return false;
		return true;
	}

	// TO STRING
	@Override
	public String toString() {
		return "ElectricBill [id=" + id + ", cost=" + cost + ", year=" + year + ", wattage=" + wattage
				+ ", managerFirstName=" + managerFirstName + ", managerLastName=" + managerLastName + "]";
	}
	
	// CONSTRUCTORS
	public ElectricBill(int id, double cost, int year, int wattage, String managerFirstName, String managerLastName) {
		this.id = id;
		this.cost = cost;
		this.year = year;
		this.wattage = wattage;
		this.managerFirstName = managerFirstName;
		this.managerLastName = managerLastName;
	}
	
	public ElectricBill() {
	}
	
}
