package com.yash.project_management;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "spring.datasource.driverClassName=org.h2.Driver",
    "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect",
    "JWT_SECRET=thisismysecretkeyforjwttokengenerationsystem",
    "SECRET_KEY=thisismysecretkeyforjwttokengenerationsystem",
    "RAZORPAY_KEY=mock_key",
    "RAZORPAY_SECRET=mock_secret"
})
class ProjectManagementApplicationTests {

	@Test
	void contextLoads() {
	}

}
