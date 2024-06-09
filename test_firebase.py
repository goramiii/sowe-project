try:
    import firebase_admin
    from firebase_admin import credentials, firestore

    print("firebase-admin 패키지가 성공적으로 설치되었습니다.")
except ImportError as e:
    print("패키지 설치에 문제가 있습니다:", e)
