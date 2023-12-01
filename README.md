<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">EVENTOR</h3>
    <h3 align="center">TICKET RESERVATION SYSTEM</h3>

  <p align="center">

  </p>
</div>

<!-- ABOUT THE PROJECT -->
## Description

### Components:
**Event**
* Renders a list of available events fetched from an external API.
* Provides categorization options for users to navigate through events easily.

**EventDetails**
* Displays comprehensive details of a selected event, including descriptions, available seats, and pricing information.
* Fetches additional event data dynamically based on user selection.

**Seating**
* Renders an interactive graphical representation of the event venue's seating arrangement.
* Tracks and manages selected seats within the component's state for users to select specific seating.

**OrderReview**
* Presents a review page summarizing the selected seats and allows users to confirm their choices before finalizing the reservation.
* Collects and processes user personal details for ticket reservation.

**Auth**
* Manages user authentication by providing forms for user registration and login.
* Secures authentication tokens and facilitates subsequent authenticated requests.

**Orders**
* Displays a user-specific page showcasing ticket reservations.
* Enables users to view or cancel their existing reservations.

**AdminDashboard**
* Exclusive dashboard for administrators, offering functionalities for event management, including addition, update, and deletion of events.
* Generates reports on ticket sales, revenue, and manages seat availability.

### Pages:
* Home
* EventPage
* TicketReservation
* UserDashboard
* AdminPage

- Individual pages integrating various components to provide a seamless user experience while navigating the system's functionalities.

### Services:
**Event Service**
* Facilitates data retrieval from the external API, providing event information and handling reservation-related requests.

**Auth Service**
* Manages user authentication endpoints, handling user registration, login requests.

**Seating Service**
* Manages the event seats based on the user selected event.

**File Downloading Service**
* Facilitates the user to upload and download files like images and reciept.

### TechStack
* ![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
* ![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
* ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

<!-- GETTING STARTED -->
## Getting Started

**Credentials**
   * 👉 User 
        📧Username = "bubblu" | 🔐Password = "barath"
   * 👉 Admin 
        📧Username = "admin" | 🔐Password = "admin"

### Screenshots
**Login**

![image](https://github.com/Barath-sermaperumal/Event_Registration_Angular/assets/145639383/424b21da-cfa7-4632-94d4-0f469b6c8010)

### USER

**User Home**

![image](https://github.com/Barath-sermaperumal/Event_Registration_Angular/assets/145639383/dcce9e5a-3f3f-4ce8-8753-6db0e72e726b)


**Event Details**

![image](https://github.com/Barath-sermaperumal/Event_Registration_Angular/assets/145639383/d3a3abfa-e681-4018-8f87-0d904fe0b22a)


**Seating Arrangment**

![image](https://github.com/Barath-sermaperumal/Event_Registration_Angular/assets/145639383/c0c7cdbc-3c0e-41cb-bb37-3367b85db3e0)


**Order Confirmation**

![image](https://github.com/Barath-sermaperumal/Event_Registration_Angular/assets/145639383/675780c2-5a2b-4810-be51-ffc743785c85)

**Orders**

![image](https://github.com/Barath-sermaperumal/Event_Registration_Angular/assets/145639383/00d53434-4ffe-45a7-991f-27e68eaa2b63)


**User Profile**

![image](https://github.com/Barath-sermaperumal/Event_Registration_Angular/assets/145639383/85686d4b-5985-44dd-a4e7-4f4ffeeada1d)

### ADMIN

**Admin Report**

![image](https://github.com/Barath-sermaperumal/Event_Registration_Angular/assets/145639383/ecd2c209-ece3-43d8-8233-096feca89535)


**List of Events**

![image](https://github.com/Barath-sermaperumal/Event_Registration_Angular/assets/145639383/f7c80a7c-34e7-44e7-b0bd-b1034bb3f6d2)


### MYSQL SCHEMA

![image](https://github.com/Barath-sermaperumal/Event_Registration_Angular/assets/145639383/1a38607a-55ca-4240-9d25-7095fcd1ec73)

### CHALLENGES FACED

* Faced challenges in creating and mapping the enitites.
* While integrating front end and back end for POST and PUT request.
* Uploading image to the server and downloading image from the server.
* Faced challenge for @OnetoOne mapping for duplicate data.
* Faced challenge in writing nested JPQL query.

### ERRORS

* Internal server error for java persisitance exception for date - Solved it by converting the date format.
* Internal server error hibernate nested exception - Solved it by reworking on the modal mapping.
* Internal server error for delete nested entities - Solved it by adding cascade type ALL.
* Altering the entity and updating it.
* Handling logic for more than 1 row found for one to one mapping.
* Model variable name mis-match while passing from front-end to back-end through ngForm and model- Solved by fixing the data type and changing the variable name


### **Front-end Repo link** 
   https://github.com/Barath-sermaperumal/Event_Registration_Angular
   
### **Back-end Repo link**  
   https://github.com/Barath-sermaperumal/Event_Registration

### **Demo Video URL**
    https://drive.google.com/file/d/1kqmPgRxiysSLPs8kPsO8DV9Qiw66j8tW/view?usp=sharing
