package communitymanagement;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;

@SuppressWarnings("deprecation")
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	private DataSource dataSource;

	// authorization
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().sessionManagement().maximumSessions(2).and()
				.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED).and().authorizeRequests().antMatchers("/")
				.permitAll().antMatchers("/login").permitAll().anyRequest().permitAll().and().formLogin().disable();
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