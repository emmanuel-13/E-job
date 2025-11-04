name="Samuel"
age=19
amount=100.5
print(f"{type(name)}: {type(age)}, {type(amount)}")
print(f"My name is {name} and I am {age} year\'s old. I have ${amount} in my bank account.")



job_types = ['Engineer', "Doctor", 'Artist', 'Teacher']
print(job_types[1:3])  # Output: Doctor

age=10
if age < 13:
    print("You are a child.")
elif age >= 20:
    print("You are an adult.")
else:
    print("You are a teenager.")



def add(a,b):
    return a + b

print(add(5, 7))  # Output: 12