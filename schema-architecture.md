architecture design
Each numbered arrow represents a key step in the flow of control or data.

Step-by-step architecture walkthrough
This section provides a detailed walkthrough of how the Smart Clinic application is structured, how requests flow through it, and how different technologies interact across the layers. The architecture follows a clean separation of concerns and adheres to Spring Boot best practices.

Each step in the diagram represents a specific tier or logical component in the application and plays a key role in processing requests, applying business logic, and persisting or retrieving data.

1. User Interface Layer
The system supports multiple user types and interaction patterns. Users can access the application through:

Thymeleaf-based web dashboards such as AdminDashboard and DoctorDashboard. These are traditional HTML pages rendered on the server and delivered to the browser.
REST API clients like mobile apps or frontend modules (e.g., Appointments, PatientDashboard, and PatientRecord) that interact with the backend via HTTP and receive JSON responses.
This separation allows the system to support both interactive browser views and scalable API-based integrations.

2. Controller Layer
When a user interacts with the application (e.g., clicking a button or submitting a form), the request is routed to a backend controller based on the URL path and the HTTP method.

Requests for server-rendered views are handled by Thymeleaf Controllers, which return .html templates that will be filled with dynamic data and rendered in the browser.
Requests from API consumers are handled by REST Controllers, which process the input, call backend logic, and return responses in JSON format.
These controllers serve as the entry points into the backend application logic, enforcing request validation and coordinating the request/response flow.

3. Service Layer
All controllers delegate logic to the Service Layer, which acts as the heart of the backend system. This layer:

Applies business rules and validations
Coordinates workflows across multiple entities (e.g., checking doctor availability before scheduling an appointment)
Ensures a clean separation between controller logic and data access
By isolating business logic here, the application becomes more maintainable, testable, and easier to scale.

4. Repository Layer
The service layer communicates with the Repository Layer to perform data access operations. This layer includes two types of repositories:

MySQL Repositories, which use Spring Data JPA to manage structured relational data like patients, doctors, appointments, and admin records.
MongoDB Repository, which uses Spring Data MongoDB to manage document-based records like prescriptions.
Repositories abstract the database access logic and expose a simple, declarative interface for fetching and persisting data.

5. Database access
Each repository interfaces directly with the underlying database engine:

MySQL stores all core entities that benefit from a normalized relational schema and constraints—such as users, roles, and appointments.
MongoDB stores flexible and nested data structures, such as prescriptions, which may vary in format and allow for rapid schema evolution.
This dual-database setup leverages the strengths of both structured and unstructured data storage approaches.

6. Model binding
Once data is retrieved from the database, it is mapped into Java model classes that the application can work with. This process is known as model binding.

In the case of MySQL, data is converted into JPA entities, which represent rows in relational tables and are annotated with @Entity.
For MongoDB, data is loaded into document objects, typically annotated with @Document, which map to BSON/JSON structures in collections.
These model classes provide a consistent, object-oriented representation of the data across the application layers.

7. Application models in use
Finally, the bound models are used in the response layer:

In MVC flows, models are passed from the controller to Thymeleaf templates, where they are rendered as dynamic HTML for the browser.
In REST flows, the same models (or transformed DTOs) are serialized into JSON and sent back to the client as part of an HTTP response.
This marks the end of the request-response cycle, delivering either a full web page or structured API data, depending on the consumer.

Summary:
This design includes 7 steps:
1.UI Layer - includes Dashboards and API
2. Controllers - SpringBoot API and REST Controllers call the service layer
3. Service Layer - Calls the REpositories for either MongoDB or MySQL depending on which data is needed.
4. Repository Layer - The repository layer accesses either the Mondo DB engine for prescription documents, or the MySQL engine for Patient, Doctor, Admin, and appointments using JPA MySQL Model Entities. The MySQL MODEL ENTITIES are Patient, Doctor, Admin, and Appointments.
6. Database Engine Layer - The Database engines connect to the Models (MySQL Models, MongoDB Models).
7. Schema Views - These are the database schemas that are modeled within the database.
