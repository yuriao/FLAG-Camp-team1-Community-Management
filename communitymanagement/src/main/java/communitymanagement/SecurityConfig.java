package communitymanagement;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;

@SuppressWarnings("deprecation")
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	private DataSource dataSource;

	// authorization
	protected void configure(HttpSecurity http) throws Exception {
		http
			.csrf().disable()
		    .httpBasic()
		    .and()
		    .authorizeRequests()
			.antMatchers("/").permitAll()
			.antMatchers("/login").permitAll()
			.antMatchers("/registration/*").permitAll()
			.antMatchers("/calendar**").permitAll()
	        .antMatchers(HttpMethod.GET, "/*/resident").hasAuthority("ROLE_RESIDENT")
	        .antMatchers(HttpMethod.GET, "/*/staff").hasAuthority("ROLE_STAFF")
	        .antMatchers(HttpMethod.GET, "/*/manager").hasAuthority("ROLE_MANAGER")
	        .antMatchers(HttpMethod.POST, "/tickets/submit").hasAnyAuthority("ROLE_RESIDENT", "ROLE_MANAGER")
	        .antMatchers(HttpMethod.PUT, "/tickets/*/update").permitAll()
	        .antMatchers(HttpMethod.PUT, "/tickets/*/staff-update").hasAuthority("ROLE_STAFF") 
	        .antMatchers(HttpMethod.POST, "/tickets/*/staff-action").hasAuthority("ROLE_STAFF") 
	        .antMatchers(HttpMethod.PUT, "/tickets/*/assignees").hasAuthority("ROLE_MANAGER")
	        .antMatchers(HttpMethod.POST, "/addStaffCategory").hasAuthority("ROLE_ADMIN")
	        .antMatchers(HttpMethod.POST, "/addIssueCategory").hasAuthority("ROLE_ADMIN")
	        .antMatchers(HttpMethod.POST, "/addWorkAssignment").hasAuthority("ROLE_ADMIN")
	        .anyRequest().permitAll()
	        .and()
	        .formLogin().disable();
	}

	// authentication
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.jdbcAuthentication().dataSource(dataSource)
				.usersByUsernameQuery("SELECT username, password, enabled FROM user WHERE username=?")
				.authoritiesByUsernameQuery("SELECT username, authorities FROM authorities WHERE username=?");
	}

	@Bean
	public static NoOpPasswordEncoder passwordEncoder() {
		return (NoOpPasswordEncoder) NoOpPasswordEncoder.getInstance();
	}
}