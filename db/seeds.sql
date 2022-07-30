INSERT INTO department (dept_name)
VALUES
    ("Manufacturing"),
    ("Quality Control"),
    ("Quality Assurance"),
    ("Supply Chain"),
    ("Accounting");

INSERT INTO role (title, salary, dept_id)
VALUES
    ("Manf. Associate I", 60000, 1),
    ("Manf. Associate II", 70000, 1),
    ("Manf. Associate III", 80000, 1),
    ("QC Associate I", 60000, 2),
    ("QC Associate II", 70000, 2),
    ("QC Associate III", 80000, 2),
    ("QA Associate I", 60000, 3),
    ("QA Associate II", 70000, 3),
    ("QA Associate III", 80000, 3),
    ("SC Associate I", 60000, 4),
    ("SC Associate II", 70000, 4),
    ("SC Associate III", 80000, 4),
    ("Accountant I", 60000, 5),
    ("Accountant II", 70000, 5),
    ("Accountant III", 80000, 5),
    ("Manf. Manager", 150000, 1),
    ("QC Manager", 150000, 2),
    ("QA Manager", 150000, 3),
    ("SC Manager", 150000, 4),
    ("Accounting Manager", 150000, 5);

    

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("Bill", "Thompson", 1 , 17),
    ("Ted", "King", 2, 17),
    ("Tom", "Harding", 3, 17),
    ("Mary", "Reed", 4, 18),
    ("Marge", "Currey", 5, 18),
    ("Laura", "Doran", 6, 18),
    ("John", "Leon", 7, 19),
    ("Ricky", "Franklin", 8, 19),
    ("Albert", "Marmaduke", 9, 19),
    ("Taylor", "Pauley", 10, 20),
    ("Ricardo", "Baxter", 11, 20),
    ("Tony", "Damian", 12, 20),
    ("Chris", "Bailey", 13, 16),
    ("Vince", "Alban", 14, 16),
    ("Wanda", "Powers", 15, 16),
    ("Carter ", "Butler", 17, NULL),
    ("Slade ", "Sylvester", 18, NULL),
    ("Robin ", "Davidson", 19, NULL),
    ("Jordan ", "Rodgers", 20, NULL),
    ("Bubbles ", "Barlow", 16, NULL);