# 파이어베이스 관리자 SDK를 임포트합니다.
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# 서비스 계정 키 파일을 사용하여 Firebase 앱을 초기화합니다.
cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# Firestore 데이터베이스 클라이언트를 초기화합니다.
db = firestore.client()

# 주어진 카테고리에 따라 메뉴 목록을 필터링하는 함수입니다.
def filter_by_category(category):
    # 'menu_list' 컬렉션에서 주어진 카테고리의 모든 하위 컬렉션을 가져옵니다.
    collections = db.collection('menu_list').document(category).collections()

    # 이미지 정보를 포함한 메뉴 이름을 저장할 리스트를 초기화합니다.
    menu_names_with_img = []
    
    # 각 하위 컬렉션을 순회합니다.
    for collection in collections:
        # 각 하위 컬렉션에서 'img' 문서를 참조합니다.
        img_ref = collection.document('img')
        # 'img' 문서를 가져옵니다.
        img_doc = img_ref.get()
        
        # 'img' 문서가 존재하는 경우
        if img_doc.exists:
            # 문서 데이터를 딕셔너리로 변환합니다.
            img_data = img_doc.to_dict()
            # 메뉴 이름과 이미지 데이터를 리스트에 추가합니다.
            menu_names_with_img.append({
                "collection_name": collection.id,
                "img": img_data
            })
    
    # 이미지 정보를 포함한 메뉴 이름 리스트를 반환합니다.
    return menu_names_with_img

# 주어진 조건(기름기, 단단함, 매움)에 따라 메뉴를 필터링하는 함수입니다.
def filter_by_options(greasiness, hardness, spiciness):
    # 'menu_list' 컬렉션의 모든 문서를 스트림으로 가져옵니다.
    categories = db.collection('menu_list').stream()
    # 필터링된 메뉴를 저장할 리스트를 초기화합니다.
    filtered_menus = []

    # 각 카테고리 문서를 순회합니다.
    for category in categories:
        category_name = category.id
        # 해당 카테고리의 모든 하위 컬렉션을 가져옵니다.
        menus = db.collection('menu_list').document(category_name).collections()
        
        for menu in menus:
            menu_name = menu.id
            # 각 메뉴의 'description' 문서를 참조합니다.
            description_ref = db.collection('menu_list').document(category_name).collection(menu_name).document('description')
            # 'description' 문서를 가져옵니다.
            description_doc = description_ref.get()
            
            # 'description' 문서가 존재하는 경우
            if description_doc.exists:
                # 문서 데이터를 딕셔너리로 변환합니다.
                description_data = description_doc.to_dict()
                # 주어진 조건과 비교하여 필터링합니다.
                if (description_data.get('greasiness', 5) <= greasiness and
                    description_data.get('hardness', 5) <= hardness and
                    description_data.get('spiciness', 5) <= spiciness):
                    # 해당 메뉴의 'img' 문서를 참조하고 가져옵니다.
                    img_ref = db.collection('menu_list').document(category_name).collection(menu_name).document('img')
                    img_doc = img_ref.get()
                    img_data = img_doc.to_dict() if img_doc.exists else {}

                    # 필터링된 메뉴 정보를 리스트에 추가합니다.
                    filtered_menus.append({
                        "category": category_name,
                        "menu_name": menu_name,
                        "description": description_data,
                        "img": img_data
                    })
    
    # 필터링된 메뉴 리스트를 반환합니다.
    return filtered_menus

# 특정 카테고리와 메뉴 이름에 대한 설명을 가져오는 함수입니다.
def filter_each_menu_description(category, menu_name):
    # 주어진 카테고리와 메뉴 이름에 해당하는 'description' 문서를 참조합니다.
    menu_description_ref = db.collection('menu_list').document(category).collection(menu_name).document('description')
    # 'description' 문서를 가져옵니다.
    menu_description = menu_description_ref.get()
    
    # 'description' 문서가 존재하는 경우
    if menu_description.exists:
        # 문서 데이터를 딕셔너리로 변환하여 반환합니다.
        return menu_description.to_dict()
    else:
        # 문서가 존재하지 않으면 None을 반환합니다.
        return None
