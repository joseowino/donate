-- Insert sample projects
INSERT INTO projects (title, description, target_amount, current_amount, image_url, category) VALUES
('Clean Water for Rural Schools', 'Providing clean water access to 5 rural schools in Kenya, benefiting over 2000 students', 50000.00, 15000.00, '/placeholder.svg?height=300&width=400', 'Education'),
('Food Security Program', 'Supporting local farmers with seeds and tools to improve food security in drought-affected areas', 75000.00, 32000.00, '/placeholder.svg?height=300&width=400', 'Agriculture'),
('Digital Learning Centers', 'Setting up computer labs in underserved communities to bridge the digital divide', 100000.00, 45000.00, '/placeholder.svg?height=300&width=400', 'Technology'),
('Healthcare Mobile Clinics', 'Funding mobile clinics to provide healthcare services to remote communities', 120000.00, 67000.00, '/placeholder.svg?height=300&width=400', 'Healthcare'),
('Youth Skills Training', 'Vocational training programs for unemployed youth in urban slums', 60000.00, 28000.00, '/placeholder.svg?height=300&width=400', 'Education');

-- Insert admin user (password: admin123)
INSERT INTO admin_users (username, password_hash) VALUES
('admin', '$2b$10$rOzJqQZ8kVx.QxOy5Qz5/.QxOy5Qz5/.QxOy5Qz5/.QxOy5Qz5/.');
