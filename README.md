# Event Tracker Project

## Technologies Used
<ul>
  <li>Java</li>
  <li>JavaScript</li>
  <li>Angular 6</li>
  <li>SpringMVC</li>
  <li>SpringREST</li>
  <li>JPA</li>
  <li>MySQL</li>
  <li>MySQLWorkbench</li>
  <li>JUnit</li>
  <li>JPQL</li>
  <li>STS</li>
  <li>AWS</li>
  <li>Git</li>
  <li>Github</li>
  <li>Hibernate</li>
  <li>Gradle</li>
</ul>

## Project Location
http://18.222.105.233:8080/ElectricBillingREST/

## Project Description

This project not only incorporates the CRUD functionality with SpringREST, but also JavaScript implementation allowing these operations to take place exclusively on a single page.

## Project Operation

This website allows the user to perform basic CRUD functions through the efficient functionality of Angular. For reading, an Angular function retrieves the whole list of electric bills in the database on the left-hand table. Additionally, a user can read the details of the bill by either clicking on it in the aforementioned table or by doing a search by id. A user can also create an entry using the Add Bill button and filling out the details. One can see the database and display section update itself whenever a user creates a new bill. The final remaining CRUD functions, update and delete, can be called up when the user selects a specific bill in the display section and presses the appropriate update or delete button.

JS functionality allows for the constant update of the left-hand table listing based on the user input, keeping the page constantly updated without redirecting the user to a different webpage. The script also allows for processing and aggregating the data to keep track of the entity details from the database. For example, in the aggregate table above the listings on the left-hand side, it not only keeps track of how many entries are in the database, total costs, and total wattage used by the company, but also the average yearly costs and average yearly wattage used, with each table row being updated with each new bill the user either creates or deletes.

## Lessons Learned

* The necessity of the flush.<br>
* Always be mindful of what can be copy/pasted, and what cannot. Always double check!<br>
* When creating HTML5 elements in JS, it is VERY difficult to get certain attributes associated with a given element. For example, I was unable to properly integrate the logic for a min-max year for creating or updating a bill or for making a given input required. If you look closely at the elements in the Java Developer Tools, you will see the min-max and required fields present, however, the browser appears unable to properly implement/recognize them.<br>
* As a follow-up to the above, a Java developer has some variety for providing checks on user input, by providing checks against empty fields either in the JS or in Java itself.<br>
