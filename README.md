# Urban Archaeology Website
This project was the Urban Archaeology Website, a minimum viable
product designed as a proof-of-concept to showcase the proposed redesign and
enhanced functionality for the company's online presence. The goal of this
project was to modernize the website’s design, improve user experience,
and introduce new features aligned with contemporary web development standards.

Development on this project was discontinued after it was communicated that
the redesign was outside the scope of my responsibilities. At the company’s
request, my focus was redirected to maintaining the existing website rather
than implementing this new version.

While incomplete, this MVP serves as a reference for potential future development
should the company choose to revisit the redesign. The project demonstrates core
UI/UX principles, scalable architecture, and modern web development practices.

## The Concept
Before I could get started on designing the new website, I needed to
understand the old one, since that was what their user base had gotten
used to, and I needed to continue maintaining the old website while
I created the new one, as the sole web developer working with Urban.

Originally, I felt the website itself needed to be a great successor, As 
this was my first professional project, I took the process extremely
seriously. Drawing from my undergraduate experience, I began by creating
a software design document to be approved by Urban Archaeology. I, then,
wireframed and mocked up the website using Figma and conducted research on
best practices for developing an effective storefront website, particularly
focusing on filterable and searchable product displays.

Finally, I was able to create the wireframe for the project:
![Wireframes for the Urban Archaeology website.](/assets/urbarch-website/wireframes.jpg)

## The Design
I decided to continue using the website's current color palette and
maintain the font choices, since they were decided upon by the
company's late lead designer, Judith Stockman. I focused solely on
redesigning the website's layout and UI for user accessibility and
ease-of-use.

The main redesign came in the catalog page, which I demonstrated
for Urban Archaeology to help visualize how the website would function.

Old:
![Catalog old.](/assets/urbarch-website/catalog_old.jpg)

Concept:
![Catalog concept.](/assets/urbarch-website/catalog_concept.jpg)

Implementation:
![Catalog implementation.](/assets/urbarch-website/catalog.jpg)

Another key component in the redesign was the product page, which featured all the
information being presented to the user in the form of text, with little interactive
elements. For that reason, I decided that hiding every variation's pricing
and only displaying the variation the user wanted to see and giving them dropdown
menus to choose from would incentivize users to explore the website, while
giving them less information to digest. I also opted to show related items under
the product, rather than in a separate tab.

Old:
![Product page old.](/assets/urbarch-website/product_old.jpg)

Concept:
![Product page concept.](/assets/urbarch-website/product_concept.jpg)

Implementation:
![Product page implementation.](/assets/urbarch-website/product.jpg)

The old website also didn't have a mobile version. This meant that users
opening the website on their phones didn't have the ability to use the
website easily. Instead needing to navigate the website using the desktop
version. To make the website more accessible, I focused some effort in
adding some responsive elements to the website.

![Mobile implementation](/assets/urbarch-website/mobile.jpg)

### The Stack

For this project, I used a variety of technologies, but the most important for
the functionality of the website are Next.js (and therefore React.js), Cockroach
Lab's Database Cluster (PostgresQL), and Sass (specifically SCSS).

The proof-of-concept version of the website can also be viewed in a 
[separate URL](https://urban-archaeology-website.kalvin.live/).

### Next.js

I've developed using many different React.js frameworks, such as Gatsby and Create
React App, but none have come as easily to me as Next.js. I've developed a few toy
websites to learn the concepts of the framework, and I thoroughly enjoy using it.
Despite that, this website needed some API endpoints to access the database, and
Next.js has route endpoints that allow for easy integration in that front. The added
benefit of the latest server component structure and app routing, means the application
was be made with a few features I had in mind built in, like URL search queries.

#### CockroachDB

This is only my second time using this tech, but the free (scaling tier meant that I
could develop the project without breaking bank for myself or the company. It also means
that since the company's website isn't very high traffic, the database can stay on the
cluster for now, saving some money. The added benefit being that the cluster is hosted
using Google Cloud Services. PostgresQL itself offers a variety of enhanced features on
top of SQL that makes adding indexing and full text search more simple.

## License
Copyright of Urban Archaeology and Kalvin Garcia. All rights reserved. This is proprietary
code created for Urban Archaeology. Unauthorized copying of these files, via any medium
is strictly prohibited. Implemented and deployed by Kalvin Garcia.







