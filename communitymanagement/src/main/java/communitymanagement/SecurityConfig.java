package communitymanagement;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
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
			.formLogin()
				.loginPage("/login")
			
			.and()			
			.authorizeRequests()
			.antMatchers("/dashboard/resident","/tickets/resident", "/tickets/submit","/tickets/*/update")
				.hasAuthority("ROLE_RESIDENT")
			.antMatchers("/dashboard/staff", "/tickets/staff", "/tickets/*/staff-action", "/tickets/*/staff-update")
				.hasAnyAuthority("ROLE_STAFF")
			.antMatchers("/dashboard/manager","/tickets/manager", "/tickets/submit", "/tickets/*/update")
				.hasAuthority("ROLE_MANAGER")
			.anyRequest().permitAll()
			
			.and()
			.logout()
				.logoutUrl("/logout");

	}

	// authentication
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// auth.inMemoryAuthentication().withUser("lobsterhxy@gmail.com").password("123").authorities("ROLE_ADMIN");
		
		auth.jdbcAuthentication().dataSource(dataSource)
				.usersByUsernameQuery("SELECT username, password, enabled FROM user WHERE username=?")
				.authoritiesByUsernameQuery("SELECT userName, authorities FROM authorities WHERE username=?");

	}

	@Bean
	public static NoOpPasswordEncoder passwordEncoder() {
		return (NoOpPasswordEncoder) NoOpPasswordEncoder.getInstance();
	}

}
