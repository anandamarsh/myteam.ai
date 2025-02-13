import csv
import random

# Lists for generating realistic data
first_names = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 
               'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen',
               'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Oliver', 'Isabella', 'Lucas', 'Sophia', 'Mason']

last_names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
              'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin']

locations = ['New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Boston', 'Seattle', 'Austin', 'Denver', 
            'Miami', 'Portland', 'Remote']

interests = ['Machine Learning', 'Web Development', 'Mobile Apps', 'Data Science', 'Cloud Computing', 
            'Cybersecurity', 'DevOps', 'UI/UX Design', 'Blockchain', 'IoT']

technologies = ['Python', 'JavaScript', 'React', 'Node.js', 'Docker', 'Kubernetes', 'AWS', 'Azure', 
               'TensorFlow', 'PyTorch', 'Vue.js', 'Angular', 'Django', 'Flask', 'MongoDB', 'PostgreSQL']

achievements = [
    'led a team of {} developers to deliver {} project ahead of schedule',
    'improved system performance by {}% through optimization',
    'implemented {} that reduced costs by {}%',
    'developed {} new features that increased user engagement by {}%',
    'managed a budget of ${} million for {} initiative',
    'mentored {} junior developers in {}',
    'contributed to {} open-source projects in the {} ecosystem'
]

certifications = [
    'AWS Certified Solutions Architect',
    'Google Cloud Professional',
    'Microsoft Azure Expert',
    'Certified Kubernetes Administrator',
    'Certified Scrum Master',
    'PMP Certification',
    'CompTIA Security+',
    'Cisco CCNA'
]

def generate_info():
    years_exp = random.randint(3, 15)
    tech_stack = ', '.join(random.sample(technologies, random.randint(3, 6)))
    achievement1 = random.choice(achievements).format(
        random.randint(3, 8),
        random.choice(['cloud migration', 'platform redesign', 'mobile app', 'ML pipeline'])
    ) if random.random() > 0.5 else random.choice(achievements).format(
        random.randint(20, 50),
        random.randint(15, 40)
    )
    certs = random.sample(certifications, random.randint(0, 2))
    cert_text = f" Holds certifications in {' and '.join(certs)}." if certs else ""
    
    info_template = """Experienced technology professional with {} years in software development and system architecture. 
Specializes in {} with strong focus on best practices and scalable solutions. {}
Currently working on {} initiatives and {} projects. 
{} Passionate about {} and constantly exploring new technologies in {}.
Advocates for {} and maintains a strong focus on {}."""

    return info_template.format(
        years_exp,
        tech_stack,
        achievement1,
        random.choice(['cloud-native', 'microservices', 'AI/ML', 'digital transformation']),
        random.choice(['open-source', 'enterprise', 'innovation', 'modernization']),
        cert_text,
        random.choice(['continuous learning', 'team collaboration', 'innovative solutions', 'technical excellence']),
        random.choice(['emerging technologies', 'cloud computing', 'artificial intelligence', 'cybersecurity']),
        random.choice(['clean code', 'agile methodologies', 'DevOps culture', 'test-driven development']),
        random.choice(['performance optimization', 'security best practices', 'user experience', 'scalable architecture'])
    )

# Generate 100 team members
used_emails = set()

with open('team_members.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['first_name', 'last_name', 'email', 'phone_no', 'role', 'location', 'interests', 'info'])
    
    count = 0
    while count < 100:
        first_name = random.choice(first_names)
        last_name = random.choice(last_names)
        # Add a random number to ensure unique emails
        email = f"{first_name.lower()}.{last_name.lower()}{random.randint(1,999)}@example.com"
        
        if email in used_emails:
            continue
            
        used_emails.add(email)
        phone_no = f"+1-{random.randint(200,999)}-{random.randint(100,999)}-{random.randint(1000,9999)}"
        role = random.choice(['Regular'] * 9 + ['Admin'])  # 10% chance of being admin
        location = random.choice(locations)
        member_interests = ', '.join(random.sample(interests, random.randint(1, 3)))
        info = generate_info()
        
        writer.writerow([
            first_name,
            last_name,
            email,
            phone_no,
            role,
            location,
            member_interests,
            info
        ])
        count += 1 