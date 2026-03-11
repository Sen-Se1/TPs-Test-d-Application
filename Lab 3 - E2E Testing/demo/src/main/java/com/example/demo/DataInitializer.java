package com.example.demo;

import com.example.demo.model.Book;
import com.example.demo.repository.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(BookRepository repository) {
        return args -> {
            if (repository.count() == 0) {

                repository.save(new Book(null,
                        "The Great Gatsby",
                        "F. Scott Fitzgerald"));

                repository.save(new Book(null,
                        "1984",
                        "George Orwell"));
            }
        };
    }
}