package com.skilldistillery.test;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.skilldistillery.entities.ElectricBill;

class ElectricBillTest {
	private EntityManagerFactory emf;
	private EntityManager em;
	private ElectricBill eb;
	
	@BeforeEach
	void setUp() {
		emf = Persistence.createEntityManagerFactory("ElectricCompany");
		em = emf.createEntityManager();
		eb = em.find(ElectricBill.class, 1);
	}
	
	@Test
	@DisplayName("Test ElectricBill entity mapping")
	void test_category_mappings() {
		assertEquals(34978.67, eb.getCost());
		assertEquals(1998, eb.getYear());
		assertEquals(2234234, eb.getWattage());
		assertEquals("Roger", eb.getManagerFirstName());
		assertEquals("Holleman", eb.getManagerLastName());
	}
	
	@Test
	@DisplayName("Test invalid ElectricBill entity")
	void test_invalid_category() {
		assertNull(em.find(ElectricBill.class, 15000));
	}
	
	@AfterEach
	void tearDown() {
		em = null;
		emf = null;
	}

}
