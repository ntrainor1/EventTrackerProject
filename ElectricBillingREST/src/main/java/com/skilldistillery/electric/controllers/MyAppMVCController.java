package com.skilldistillery.electric.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MyAppMVCController {

	 @RequestMapping(path="/", method=RequestMethod.GET)
	  public String home() {
	    return "index.html";
	  }
	 
}
