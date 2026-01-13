import csv
import random
import os

# Ensure directory exists
os.makedirs('/Users/kevin/Documents/antigravity/bingo', exist_ok=True)

# 1. Generate Candidates (1000 entries)
# Format: ID, Name, Department
candidates_file = '/Users/kevin/Documents/antigravity/bingo/candidates.csv'
first_names = ["小明", "大華", "雅婷", "冠宇", "怡君", "志明", "淑芬", "豪豪", "安安", "凱文", "佩珊", "建國", "美玲", "家豪", "慧君"]
last_names = ["王", "李", "張", "劉", "陳", "楊", "黃", "趙", "吳", "周", "徐", "孫", "馬", "朱", "胡", "林", "何", "郭"]
departments = ["IT 部門", "人力資源部", "業務部", "行銷部", "財務部", "行政部", "研發中心", "客服部", "法務部", "營運部"]

with open(candidates_file, 'w', newline='', encoding='utf-8-sig') as f: # utf-8-sig for Excel compatibility
    writer = csv.writer(f)
    # Header
    writer.writerow(['編號', '姓名', '部門名稱'])
    
    for i in range(1, 1001):
        emp_id = f"EMP{str(i).zfill(4)}"
        # Generate a random name
        lname = random.choice(last_names)
        fname = random.choice(first_names)
        full_name = f"{lname}{fname}" 
        dept = random.choice(departments)
        
        writer.writerow([emp_id, full_name, dept])

print(f"Generated {candidates_file}")

# 2. Generate Prizes (20 items)
# Format: Prize Name, Count
prizes_file = '/Users/kevin/Documents/antigravity/bingo/prizes.csv'
prizes = [
    ("特獎 - 歐洲豪華十日遊", 1),
    ("頭獎 - 新台幣 88,888 元", 1),
    ("二獎 - Apple iPhone 15 Pro", 3),
    ("三獎 - iPad Air", 5),
    ("四獎 - Sony PS5 主機", 5),
    ("五獎 - Dyson 吹風機", 8),
    ("六獎 - Nintendo Switch", 10),
    ("七獎 - 掃地機器人", 10),
    ("八獎 - AirPods Pro", 20),
    ("九獎 - 高級餐券", 30),
    ("十獎 - 3000元 禮券", 40),
    ("幸運獎 - 1000元 禮券", 50),
    ("普獎 - 500元 禮券", 100),
    ("參加獎 - 品牌保溫杯", 150),
    ("加碼獎 - 總經理紅包", 5),
    ("部門獎 - Team Building 基金", 10),
    ("早鳥獎 - 咖啡兌換卷", 50),
    ("全勤獎 - 電影票兩張", 200),
    ("樂透獎 - 公益彩券", 100),
    ("安慰獎 - 精美文具組", 202) # Total sums roughly to 1000
]

with open(prizes_file, 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(['獎項名稱', '名額'])
    for name, count in prizes:
        writer.writerow([name, count])

print(f"Generated {prizes_file}")
